const vehicles = require('./vehicle.mongo')
const faults = require('./fault.mongo')
const violations = require('./violation.mongo')

async function findViolation(filter) {
    try {
        const violation = await violations.find(filter)
        return violation
    } catch (err) {
        console.log(err)
        return {}
    }
}

async function addVehicle(vehicle) {
    try {
        await vehicles.updateOne({licensePlate: vehicle.licensePlate}, {
            id: vehicle.id ,licensePlate: vehicle
        }, {
            upsert: true
        })
        return vehicle
    } catch(err) {
        console.log(err)
        return {}
    }
}

async function addFault(fault) {
    try {
        await faults.updateOne({name: fault.name, chargeMoney: fault.chargeMoney}, {
            id: fault.id, name: fault.name,
        }, {
            upsert: true
        })
        return fault
    } catch(err) {
        console.log(err)
        return {}
    }
}


async function addViolation(vehicle, fault) {
    try {
        const ve = await addVehicle(vehicle)
        const fa = await addFault(fault)
        if (ve && fa) {
            await violations.updateOne({name: fault.name, chargeMoney: fault.chargeMoney}, {
                id: fault.id, name: fault.name,
            }, {
                upsert: true
            })
    
            return violations
        }
        else {
            return {
                error: "Error occurs when add vehicle or fault"
            }
        }      
    } catch(err) {
        console.log(err)
        return {
            error: "Error occurs when add violation"
        }
    }
}

module.exports = {
    findViolation,
    addViolation,
}
