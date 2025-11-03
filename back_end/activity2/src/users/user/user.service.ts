import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.user.dto';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.user.dto';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';

@Injectable()
export class UserService {

    constructor(private jwtService: JwtService, @InjectRepository(User) private userRepository: Repository<User>) {}

    async signIn(loginDto: LoginDto) {
        const user = await this.userRepository.findOne({ where: { username: loginDto.username } });
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const passwordMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

        const token = this.jwtService.sign({ username: user.username, sub: user.id });
        return { access_token: token };
    }

    async signUp(registerDto: RegisterDto) {
        try {
            // Check if username is too long
            if (registerDto.username.length > 30) {
                throw new BadRequestException('Username cannot be longer than 30 characters');
            }

            // Check for existing user
            const existing = await this.userRepository.findOne({ where: { username: registerDto.username } });
            if (existing) {
                throw new BadRequestException('Username already exists');
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(registerDto.password, 10);

            // Create new user
            const newUser = this.userRepository.create({
                username: registerDto.username,
                password: hashedPassword,
            });

            // Save user
            await this.userRepository.save(newUser);

            return {
                success: true,
                message: 'User registered successfully!',
                username: registerDto.username
            };
        } catch (error) {
            // Handle known errors
            if (error instanceof BadRequestException) {
                throw error;
            }

            // Handle database-specific errors
            if (error.code === '23505') { // PostgreSQL unique violation
                throw new BadRequestException('Username already exists');
            }

            // Log unexpected errors
            console.error('Registration error:', error);

            // Return a generic error message
            throw new BadRequestException('Registration failed. Please try again later.');
        }
    }

}



