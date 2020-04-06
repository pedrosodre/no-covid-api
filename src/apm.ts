import { name, version } from '../package.json';
import apm from 'elastic-apm-node';

apm.start({
    serviceName: name,
    serviceVersion: version,
    environment: process.env.NODE_ENV,
    active: process.env.NODE_ENV === 'production',
});