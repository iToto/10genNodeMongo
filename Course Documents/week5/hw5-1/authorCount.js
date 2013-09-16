use blog
db.posts.aggregate([
    {$unwind:"$comments"},
    {$group:
        {
            _id:{author:"$comments.author"},
            comment_count:{$sum:1}
        }
    },
    {$sort:{"comment_count":1}}
])