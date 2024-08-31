import { compare, genSalt, hash } from "bcrypt";
import { User } from "../db/models/user.model";
import jwt from "jsonwebtoken";
import { RefreshToken } from "../db/models/refresh-token.model";
import { mailService } from "./mail.service";
import env from "../config/env.config";

class UserService {
  public findUserByEmail = async (email: string): Promise<User | null> => {
    const user = await User.findOne({ where: { email } });

    return user;
  };

  public createUser = async (email: string, password: string) => {
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    const verificationToken = jwt.sign({ email }, "verify_email");
    const user = await User.create({
      email: email,
      password: hashedPassword,
      verificationToken: verificationToken,
    });

    ////call method to send verification email
    await this.sendVerificationEmail(user);
  };

  private sendVerificationEmail = async (user: User) => {
    const mail = {
      from: "precious.c.nnam@gmail.com",
      to: user.email,
      subject: "Welcome to Livedraft",
      text: `Click the following link to verify your email: https://${env.HOST}/user/verify-email/${user.verificationToken}`,
    };

    await mailService.sendMail(mail);
  };

  public sendPasswordResetEmail = async (user: User) => {
    const mail = {
      from: "precious.c.nnam@gmail.com",
      to: user.email,
      subject: "Reset your password",
      text: `You can reset your password through this link: https://${env.HOST}/user/reset-password/${user.passwordResetToken}`,
    };

    await mailService.sendMail(mail);
  };

  public checkPassword = async (
    user: User,
    password: string
  ): Promise<boolean> => {
    return await compare(password, user.password);
  };

  public getRequestUser = async (
    user: User | RequestUser
  ): Promise<RequestUser> => {
    if (user instanceof User) {
      const userWithRoles = await User.scope("withRoles").findByPk(user.id);
      const roles = userWithRoles?.userRoles.map(
        (userRole) => userRole.role.name
      );

      return {
        id: user.id,
        email: user.email,
        roles: roles,
      } as RequestUser;
    } else return user;
  };

  public generateAuthResponse = async (
    user: RequestUser | User
  ): Promise<TokenPair> => {
    const requestUser = await this.getRequestUser(user);

    const accessToken = jwt.sign(requestUser, "access_token", {
      expiresIn: "24h",
    });

    const refreshToken = jwt.sign(requestUser, "refresh_token", {
      expiresIn: "7d",
    });

    await RefreshToken.destroy({
      where: { userId: requestUser.id },
    });

    await RefreshToken.create({
      token: refreshToken,
      userId: requestUser.id,
    });

    return { accessToken, refreshToken };
  };

  public getIsTokenActive = async (token: string): Promise<Boolean> => {
    const refreshToken = await RefreshToken.findOne({
      where: { token },
    });

    return refreshToken != null;
  };

  public logoutUser = async (userId: number) => {
    await RefreshToken.destroy({
      where: {
        userId,
      },
    });
  };

  public findUserById = async (id: number): Promise<User | null> => {
    const user = await User.findByPk(id);

    return user;
  };

  public resetPassword = async (user: User) => {
    const passwordResetToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      "password_reset",
      {
        expiresIn: "24h",
      }
    );
    await user.update({ passwordResetToken });

    //send password reset email method should be called
    await this.sendPasswordResetEmail(user);
  };

  public findUserByPasswordResetToken = async (
    email: string,
    passwordResetToken: string
  ): Promise<User | null> => {
    const user = await User.findOne({
      where: { email, passwordResetToken },
    });
    return user;
  };

  public updatePassword = async (user: User, password: string) => {
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    await user.update({ password: hashedPassword });
  };

  public findUserByVerificationToken = async (
    email: string,
    verificationToken: string
  ): Promise<User | null> => {
    const user = User.findOne({
      where: {
        email,
        verificationToken,
      },
    });

    return user;
  };

  public updateIsVerified = async (user: User, isVerified: boolean) => {
    await user.update({ isVerified });
  };
}

const userService = new UserService();

export { userService };
