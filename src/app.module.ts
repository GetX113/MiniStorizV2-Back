import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { RelationsModule } from './relations/relations.module';
import 'reflect-metadata';
import { Relation } from './relations/relation.entity';
import { MessagesModule } from './messages/messages.module';
import { Message } from './messages/message.entity';
import { HistoiresModule } from './histoires/histoires.module';
import { ImpressionsModule } from './impressions/impressions.module';
import { PlanchesModule } from './planches/planches.module';
import { Histoire } from './histoires/histoire.entity';
import { Planche } from './planches/planche.entity';
import { Notification } from './notification/notification.entity';
import { Impression } from './impressions/impression.entity';
import { TelechargementController } from './telechargementDesFichiers/telechargement.Controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { Bloquer } from './bloquer/bloquer.entity';
import { BloquersModule } from './bloquer/bloquers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      /* type: 'mysql',
      host: '139.162.173.7',
      port: 3306,
      username: 'codemedi_ministoriez',
      password: 'codemedi_ministoriez',
      database: 'codemedi_ministoriez', */
        type: 'mysql',
        host: '127.0.0.1',
        // port: 3306,
        // username: 'root',
        // password: '',
        // database: 'MiniStorizDb',
      //  host: '139.162.169.45',
       port: 3306,
       username: 'codesqu1_mini',
       password: 'codesqu1_mini',
       database: 'codesqu1_minis',
      //  host: '139.162.169.45',
      //   port: 3306,
      //  username: 'codesqu1_ministoriez',
      //   password: 'codesqu1_ministoriez',
      //   database: 'codesqu1_ministoriez',
      entities: [User, Relation, Message, Histoire, Planche, Impression, Notification,Bloquer],
      synchronize: true,
      logging: true,
    }),

    UsersModule,
    RelationsModule,
    MessagesModule,
    HistoiresModule,
    ImpressionsModule,
    PlanchesModule,
    NotificationModule,
    BloquersModule
  ],
  providers: [AppService],
  controllers: [TelechargementController, AppController],
})
export class AppModule {}