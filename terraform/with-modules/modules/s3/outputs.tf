output "bucket_arn" {
  description = "Bucket ARN value"
  value = aws_s3_bucket.example_bucket.arn
}