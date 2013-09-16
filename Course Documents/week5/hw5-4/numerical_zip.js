use postal
db.zips.aggregate([
    {$match:
        {
            city:{$regex:'^[0-9].*'}
        }
    },
    {$group:
        {
            _id:null,
            total_pop:{$sum:"$pop"}
        }
    }
])