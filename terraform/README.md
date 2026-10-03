# Terraform on AWS

Three small Terraform labs, from a single resource to modules and a remote state backend. All use `us-east-1`.

| Folder | What it covers |
|---|---|
| [`basics/`](basics) | Variables, outputs, two provider aliases (two regions), and an EC2 instance |
| [`with-modules/`](with-modules) | Reusable modules in `modules/` for EC2, S3 and a DynamoDB lock table, called from one root file |
| [`remote-backend/`](remote-backend) | S3 backend with DynamoDB state locking and encryption, used by an EC2 instance |

## How the pieces fit

1. `with-modules/` creates the S3 bucket and the `terraform-lock` DynamoDB table.
2. `remote-backend/backend.tf` then stores its state in that bucket and uses that table for locking.

So apply `with-modules` first, or the backend in `remote-backend` has nothing to point at.

## Before you run anything

The AMI, subnet ID and bucket name in the examples belong to one AWS account. Replace them with your own:

- `ami-...` values with an AMI valid in your region
- `subnet-...` values with a subnet in your VPC
- `raghav-14-jun-bucket` with a globally unique bucket name (S3 names are shared across all accounts)

Then, per folder:

```bash
terraform init
terraform plan
terraform apply
terraform destroy   # when finished, to avoid charges
```

The S3 module sets `force_destroy = true` so the lab bucket can be removed with its contents. Do not copy that setting into real environments.

## Security notes

- `.gitignore` excludes state files, `.tfvars` and the `.terraform/` directory. Never commit state: it can contain sensitive values.
- No credentials live in this code. Authenticate with `aws configure` or an SSO profile.

## CI

`.github/workflows/terraform-ci.yml` at the repo root runs `terraform init -backend=false` and `terraform validate` for each folder.
