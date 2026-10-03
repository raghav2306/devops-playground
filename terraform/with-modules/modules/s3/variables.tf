variable "bucket_name" {
  description = "Bucket Name to be specified"
  type = string
}

variable "tags" {
    description = "Common tags to apply to resource"
    type = map(string)
}