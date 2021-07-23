import * as Minio from 'minio'

import environment from './environment'

const requiredBuckets = ['graders', 'submissions']

const minioConfiguration: Minio.ClientOptions = {
  endPoint: environment.minioHost,
  port: environment.minioPort,
  useSSL: false,
  accessKey: environment.minioUsername,
  secretKey: environment.minioPassword,
}

export const minioClient = new Minio.Client(minioConfiguration)

export async function initializeMinio() {
  for (const bucketName of requiredBuckets) {
    if (!await minioClient.bucketExists(bucketName)) {
      minioClient.makeBucket(bucketName, 'us-east-1', function(err) {
        if (err) {
          throw new Error(`Error creating MinIO bucket '${bucketName}'`)
        }
      })
    }
  }
}
