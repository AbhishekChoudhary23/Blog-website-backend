use demo1;

CREATE TABLE comments (
    comment_id VARCHAR(40) PRIMARY KEY DEFAULT (UUID()),
    post_id VARCHAR(40) NOT NULL,
    created_by VARCHAR(40) NOT NULL,
    comment_body varchar(300) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    is_archived BOOLEAN DEFAULT FALSE,
    CONSTRAINT COMMENT_POST FOREIGN KEY (post_id) REFERENCES posts(post_id),
    CONSTRAINT COMMENT_USER FOREIGN KEY (created_by) REFERENCES users(id)
);

drop table comments;

SELECT * FROM comments;