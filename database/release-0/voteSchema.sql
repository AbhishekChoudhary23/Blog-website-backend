
use demo1;

CREATE TABLE user_votes (
    user_id VARCHAR(40) NOT NULL,
    post_id VARCHAR(40) NOT NULL,
    vote_value INT CHECK (vote_value IN (-1, 1)) DEFAULT NULL,
    PRIMARY KEY (user_id, post_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id)
);

select * from user_votes;
select * from posts;