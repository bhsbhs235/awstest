import mongoose, { Connection } from 'mongoose';

export class MongoConnector {
    private mongoConnection: Connection;

    constructor() {

    }
    
    public connect(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            mongoose.connection.once('open', function () {
                console.log('MongoDB event open');

                mongoose.connection.on('connected', () => {
                    console.log('MongoDB event connected');
                });

                mongoose.connection.on('disconnected', () => {
                    console.log('MongoDB event disconnected');
                });

                mongoose.connection.on('reconnected', () => {
                    console.log('MongoDB event reconnected');
                });

                mongoose.connection.on('error', (err) => {
                    console.log('MongoDB event error: ' + err);
                });

                return resolve(null);
            });
            
            // all executed methods log output to console
            mongoose.set('debug', true)
            // disable colors in debug mode
            mongoose.set('debug', { color: false })
            // get mongodb-shell friendly output (ISODate)
            mongoose.set('debug', { shell: true })

            //db setting
            this.mongoConnection = mongoose.connection;
            mongoose.connect(process.env.MONGO_URL, { 
                keepAlive: true, 
                // useNewUrlParser: true, 
                // useUnifiedTopology: true, 
                // autoReconnect: false,
                // useCreateIndex: true 
            }).then(() => {
                console.log('MongoDB Connected.');
                resolve(null);
            }).catch(reject);
        });
    }

    public disconnect(): Promise<any> {
        return this.mongoConnection.close();
    }
}