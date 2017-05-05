interface AuthConfiguration {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
}

export const myConfig: AuthConfiguration = {
    CLIENT_ID: 'iH0j70AQhUDPgbW6Ah-x-wcqa7EKxx-0',
    CLIENT_DOMAIN: 'alexkibler.auth0.com',
    AUDIENCE: 'http://spells.alexkibler.com/api',
    REDIRECT: 'http://localhost:4200',
    SCOPE: 'openid'
};
