provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "example2" {
  ami = "ami-084568db4383264d4"
  instance_type = "t2.micro"
  subnet_id = "subnet-076d440ac519d41b9"
}