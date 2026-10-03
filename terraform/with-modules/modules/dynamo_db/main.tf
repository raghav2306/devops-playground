resource "aws_dynamodb_table" "terraform_lock" {
  name = var.dynamo_db_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key = var.hash_key

  dynamic "attribute" {
    for_each = var.dynamodb_attributes
    content {
      name = attribute.value.name
      type = attribute.value.type
    }
  }

  tags = var.dynamo_db_tags
}