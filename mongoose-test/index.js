const mongoose = require('mongoose')

const MONGODB_URL = process.env.MONGODB_URL

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGODB_URL);

    const kittySchema = new mongoose.Schema({
        name: String
      });
    const Kitten = mongoose.model('Kitten', kittySchema);  
    const silence = new Kitten({ name: 'Silence2' });
    await silence.save();
    console.log(silence.name); // 'Silence'
    const kittens = await Kitten.find();
    console.log(kittens);
    
}
