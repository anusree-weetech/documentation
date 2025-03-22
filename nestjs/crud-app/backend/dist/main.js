"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
const remove_sensitive_data_interceptor_1 = require("./common/interceptors/remove-sensitive-data.interceptor");
const validation_pipe_1 = require("./common/pipes/validation.pipe");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const fs = require("fs");
const express = require("express");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const session_secret = configService.get('SESSION_SECRET');
    const port = configService.get('PORT');
    app.use(session({
        secret: session_secret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 3600000,
        },
    }));
    app.useGlobalInterceptors(new remove_sensitive_data_interceptor_1.RemoveSensitiveDataInterceptor());
    app.useGlobalPipes(new validation_pipe_1.StrictValidationPipe());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('NestJS Crud App API')
        .setDescription('API Documentation using RapiDoc')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs2', app, document);
    const documentationPath = (0, path_1.join)(__dirname, '..', 'src/documentation');
    if (!fs.existsSync(documentationPath)) {
        fs.mkdirSync(documentationPath, { recursive: true });
    }
    fs.writeFileSync((0, path_1.join)(documentationPath, 'swagger.json'), JSON.stringify(document));
    app.use('/docs', (req, res, next) => {
        const protocol = req.protocol;
        const host = req.get('host');
        document.servers = [{ url: `${protocol}://${host}` }];
        next();
    }, express.static((0, path_1.join)(documentationPath)));
    app.use('/swagger.json', express.static((0, path_1.join)(documentationPath, '/swagger.json')));
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map