const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
module.exports = {
    CreateCompany: (data) => {
        return new Promise(async (resolve, reject) => {
            console.log(data)
            try {
                const {
                    companyName,
                    legalName,
                    financialYear,
                    baseCurrency,
                    taxId,
                    address,
                    city,
                    state,
                    postalCode,
                    country,
                    phone,
                    email,
                    website,
                    businessType,
                    industry
                } = data;

                const newCompany = await prisma.Company.create({
                    data: {
                        companyName,
                        legalName,
                        financialYear,
                        baseCurrency,
                        taxId,
                        address,
                        city,
                        state,
                        postalCode,
                        country,
                        phone,
                        email,
                        website,
                        businessType,
                        industry,

                    }
                })
                resolve(newCompany)
            } catch (err) {
                console.log(err)
            }
        })

    }
}