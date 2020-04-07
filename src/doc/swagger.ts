/* istanbul ignore file */
import { DocumentBuilder } from "@nestjs/swagger";
import { version } from '../../package.json';

export const documentBuilderOptions = new DocumentBuilder()
    .setTitle('No Covid API')
    .setDescription(`Documentação em construção. API pública contendo informações atualizadas várias vezes durante o dia sobre a pandemia COVID-19. O objetivo da API é permitir que mais aplicações informativas apareçam para manter a população consciente sobre o coronavírus. Em caso de quaisquer dúvidas ou problemas, não deixe de entrar em contato comigo (espero liberar a aplicação para colaboração em breve).

Para começar a usar a API, solicite um par de chaves através do endpoint /application e em seguida gere um token JWT no endpoint /application/token. Como a API é pública e gratuita, há um limite de requisições para qualquer token gerado (por aplicação). Caso necessite de mais limite, entre em contato.`)
    .addServer('https://api-no-covid.pedrosodre.dev', 'Servidor em produção da API')
    .setVersion(version)
    .setContact('Pedro Sodré', 'https://www.pedrosodre.dev', 'pedro@pedrosodre.dev')
    .addTag('Application', 'Endpoints relacionados a autenticação e autorização. Há um rate limit nos endpoints com o objetivo de evitar criação em massa de chaves, logo, evite realizar requests sem necessidade.')
    .addTag('Cases', 'Endpoints relacionados a quantidade de casos por região (cidade, estado ou país).')
    .addTag('Information', 'Endpoints relacionados a informações, fontes e estatísticas da API.')
    .addTag('News', 'Endpoints relacionados as notícias no Brasil e em alguns países do mundo sobre o COVID-19.')
    .addBasicAuth()
    .addBearerAuth()
    .build();