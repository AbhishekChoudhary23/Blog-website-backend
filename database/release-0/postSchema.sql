use demo1;
CREATE TABLE posts (
    post_id VARCHAR(40) NOT NULL PRIMARY KEY DEFAULT (UUID()),
    title VARCHAR(50) NOT NULL,
    content VARCHAR(500) NOT NULL,
    topics JSON,
    up_downVote INT SIGNED DEFAULT 0,
    no_of_votes INT DEFAULT 0,
    created_by VARCHAR(40) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    is_archived BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

select * from posts;

drop table posts;
