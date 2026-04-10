provider "aws" {
  region = "us-east-1"
}

# Grupo de seguridad
resource "aws_security_group" "mi_sg" {
  name = "mi_sg"

  ingress {
    description = "App Node"
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
  instance_type = "t3.micro"

  key_name = "mi-clave"

  vpc_security_group_ids = [aws_security_group.mi_sg.id]

  user_data_replace_on_change = true

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y nodejs git

              cd /home/ec2-user
              git clone https://github.com/JuanPabloJimenezCoy/DevOps_service.git

              cd DevOps_service
              npm install

              nohup node servicio-vulnerable/server.js > app.log 2>&1 &
              EOF

  tags = {
    Name = "mi-app-node"
  }
}

output "public_ip" {
  value = aws_instance.mi_servidor.public_ip
}