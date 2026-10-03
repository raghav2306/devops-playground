provider "aws" {
  region = "us-east-1"
}

/********************************* EC2 Module ************************/

module "ec2_instance" {
  source = "./modules/ec2_instance"
  instance_type = "t2.micro"
  ami_value = "ami-084568db4383264d4"
  subnet_id_value = "subnet-076d440ac519d41b9"
}

output "ec2_instance_public_ip" {
  value = module.ec2_instance.public_ip
}

/********************************* S3 Module ************************/

module "s3_bucket"{
  source = "./modules/s3"
  bucket_name = "raghav-14-jun-bucket"
  tags = {
    Name = "Project 1"
    Environment = "dev"
  }
}

output "s3_bucket_arn" {
  value = module.s3_bucket.bucket_arn
}

/********************************* DynamoDB Module ************************/

module "dynamodb" {
  source = "./modules/dynamo_db"
  dynamo_db_table_name = "terraform-lock"
  hash_key = "LockID"
  dynamodb_attributes = [
  { name = "LockID", type = "S" },
]
  dynamo_db_tags = {
    Name = "Project 1"
    Environment = "dev"
  }
}

output "dynamo_db_table_arn" {
  value = module.dynamodb.dynamo_db_table_arn
}