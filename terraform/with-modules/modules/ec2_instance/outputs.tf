output "public_ip" {
  description = "Public IP of the instance"
  value = aws_instance.example_server.public_ip
}