-- Drops posts table
DROP TABLE IF EXISTS posts;

-- Creates posts table
CREATE TABLE IF NOT EXISTS posts (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , user_id varchar(50) NOT NULL
    , title varchar(50) NOT NULL
    , content text NOT NULL
    , created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    , updated_at TIMESTAMP(3) NOT NULL
);

-- Drops favorites table
DROP TABLE IF EXISTS favorites;

-- Creates favorites table
CREATE TABLE IF NOT EXISTS favorites (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , user_id varchar(50) NOT NULL
    , post_id varchar(50) NOT NULL
    , created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    , updated_at TIMESTAMP(3) NOT NULL
);
