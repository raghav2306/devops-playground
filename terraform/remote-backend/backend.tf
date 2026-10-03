terraform {
  backend "s3" {
    bucket = "raghav-14-jun-bucket"
    key="raghav/terraform.tfstate"
    region = "us-east-1"
    dynamodb_table = "terraform-lock"
    encrypt = true
  }
}