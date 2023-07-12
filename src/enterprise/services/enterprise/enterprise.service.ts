import { Injectable, NotFoundException, ServiceUnavailableException} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { CreateEnterpriseDto } from 'src/enterprise/enterprise.dto';
import { FileData, FileUploadParams } from 'src/enterprise/types';
import { Client } from 'src/typeorm/client.entity';
import { Enterprise } from 'src/typeorm/enterprise.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EnterpriseService {
  constructor(
    @InjectRepository(Enterprise) private readonly enterpriseRepository: Repository<Enterprise>,
    @InjectRepository(Client) private readonly clientRepository: Repository<Client>,
    private readonly configService: ConfigService
  ) { }

  async createEnterprise(body: CreateEnterpriseDto) {
    const client = await this.clientRepository.findOne({
      relations: {
        template: true
      },
      where: {
        id: body.client
      }
    });
    if (!client) {
      throw new NotFoundException('Cliente no existe')
    }
    const newEnterprise = new Enterprise();
    newEnterprise.id = body.id;
    newEnterprise.enterpriseName = body.enterpriseName;
    newEnterprise.email = body.email;
    newEnterprise.templateInputs = client.template.inputs;
    newEnterprise.client = client;
    return this.enterpriseRepository.save(newEnterprise);
  }

  async getEnterpriseById(id: number) {
    const enterprise = await this.enterpriseRepository.findOneBy({ id });
    if (!enterprise) {
      throw new NotFoundException('La empresa no existe')
    }
    return enterprise;
  }

  getEnterprises() {
    return this.enterpriseRepository.find();
  }

  async uploadFile(fileData: FileData, params: FileUploadParams) {
    const enterpriseId = parseInt(params.enterpriseId);
    const templateInputId = parseInt(params.templateInputId);

    const enterprise = await this.enterpriseRepository.findOneBy({ id: enterpriseId });
    if (!enterprise) {
      throw new NotFoundException('Empresa no existe')
    }

    const templateInputIndex = enterprise.templateInputs.findIndex(templateInput => templateInput.id === templateInputId);
    if (templateInputIndex === -1) {
      throw new NotFoundException('El templateInput no existe en esta empresa')
    }

    const s3 = new S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY')
    });

    const uploadResult = await s3.upload({
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Body: fileData.file,
      Key: `${enterprise.id}-${enterprise.templateInputs[templateInputIndex].id}-${fileData.fileName}`,
      ACL: "public-read",
      ContentType: fileData.mimeType,
      ContentDisposition: "inline",
    }).promise();

    const loadedFile = {
      location: uploadResult.Location,
      key: uploadResult.Key
    }

    enterprise.templateInputs[templateInputIndex].file = loadedFile;
    return this.enterpriseRepository.save(enterprise);
  }

  async deleteFile(params: FileUploadParams) {
    const enterpriseId = parseInt(params.enterpriseId);
    const templateInputId = parseInt(params.templateInputId);

    const enterprise = await this.enterpriseRepository.findOneBy({ id: enterpriseId });
    if (!enterprise) {
      throw new NotFoundException('Empresa no existe')
    }

    const templateInputIndex = enterprise.templateInputs.findIndex(templateInput => templateInput.id === templateInputId);
    if (templateInputIndex === -1) {
      throw new NotFoundException('El templateInput no existe en esta empresa')
    }

    const s3 = new S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY')
    });

    const config = {
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Key: enterprise.templateInputs[templateInputIndex].file.key
    }

    const deleteResults = await s3.deleteObject(config, (err, data) => {
      if (err) {
        throw new ServiceUnavailableException('Hubo un error, volver a intentarlo mas tarde')
      }
    }).promise()

    delete enterprise.templateInputs[templateInputIndex].file;
    return this.enterpriseRepository.save(enterprise);
  }
}
