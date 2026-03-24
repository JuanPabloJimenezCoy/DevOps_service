provider "aws" {
  region = "us-east-1"
}

# Grupo de seguridad (abre puertos)
resource "aws_security_group" "mi_sg" {
  name = "mi_sg"

  ingress {
    description = "HTTP app"
    from_port   = 3001
    to_port     = 3001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Instancia EC2
resource "aws_instance" "mi_servidor" {
  ami           = "ami-0c02fb55956c7d316"
  instance_type = "t2.micro"

  vpc_security_group_ids = [aws_security_group.mi_sg.id]

  tags = {
    Name = "mi-app-node"
  }
}