import * as jwt from 'jsonwebtoken';
import { Injectable, UploadedFile } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import * as argon2 from 'argon2';
import * as qiniu from 'qiniu';

@Injectable()

export class UploadService {
    constructor(
        private config: ConfigService,
    ) { }

    async upload(@UploadedFile() file) {
        const mac = new qiniu.auth.digest.Mac(this.config.get('QINIU_AK'), this.config.get('QINIU_SK'));
        const options = {
            scope: this.config.get('QINIU_BUCKEY'),
        };
        const policy = new qiniu.rs.PutPolicy(options);
        const token = policy.uploadToken(mac);
    }
}