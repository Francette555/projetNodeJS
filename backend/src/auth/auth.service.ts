import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(username: string, password: string) {
    // Compte admin fixe pour la démo
    if (username === 'admin' && password === 'admin') {
      const payload = { username, sub: username };
      return {
        access_token: this.jwtService.sign(payload),
        message: 'Authentification réussie',
      };
    }
    throw new UnauthorizedException('Nom d\'utilisateur ou mot de passe incorrect');
  }
}