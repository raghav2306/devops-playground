provider "aws" {
  alias = "us-east-1"
  region = "us-east-1"
}

provider "aws" {
  alias = "us-east-2"
  region = "us-east-2"
}

variable "instance_type" {
  description = "Type of Instance"
  type = string
  default = "t2.micro"
}

variable "subnet_id" {
  description = "Subnet to launch the instance in (replace with a subnet from your account)"
  type = string
  default = "subnet-076d440ac519d41b9"
}

variable "ami_id" {
  description = "value of AMI"
  default = "ami-084568db4383264d4"
}

resource "aws_instance" "server1" {
  ami = var.ami_id
  instance_type = var.instance_type
  subnet_id = var.subnet_id
  key_name = "Docker"
  provider = aws.us-east-1

  tags = {
    Name = "server1"
    Owner = "Raghav"
  }
}

output "public_ip" {
  description = "Public IP address of the instance"
  value = aws_instance.server1.public_ip
}

output "private_ip" {
  description = "Private IP address of the instance"
  value=aws_instance.server1.private_ip
}

# resource "aws_instance" "server2" {
#   ami = "ami-06971c49acd687c30"
#   instance_type = "t2.micro"
#   provider = aws.us-east-2

#   tags = {
#     Name = "Server2"
#     Owner = "Raghav"
#   }
# }