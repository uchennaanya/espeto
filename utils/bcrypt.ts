import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()


export const hash = async (value: string) => {
    console.log(value,  Number(process.env.SALT));
    
    return await bcrypt.hash(value, Number(process.env.SALT))
}

export const compare = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword)
}
