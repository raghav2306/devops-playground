variable "dynamo_db_table_name" {
  description = "Dynamo DB table Name"
}

variable "hash_key" {
  type        = string
  description = "Partition key name"
}

variable "dynamodb_attributes" {
  description = "List of DynamoDB attribute definitions"
  type = list(object({
    name = string
    type = string
  }))
}

variable "dynamo_db_tags" {
  description = "tags for dynamo db"
  type = map(string)
}