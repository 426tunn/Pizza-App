const app = require('./index');
// const {connectToDB} = require('./database/db');
const logger = require('./logging/logger');


const PORT = 4544;
// connectToDB();

app.listen(PORT, ()=>{
 logger.info(`Server is running at PORT: ${PORT}`)
})

