output "dynamo_db_table_arn" {
  description = "ARN for the dynamo DB table"
  value = aws_dynamodb_table.terraform_lock.arn
}