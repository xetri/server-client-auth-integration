import { DataSource } from "typeorm"
import { Session, User } from '#db/entity';

const TestDataSource = new DataSource({
    type: "postgres",
    host: "172.17.0.2",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    entities: [ User, Session ],
    synchronize: true,
})

export default TestDataSource;