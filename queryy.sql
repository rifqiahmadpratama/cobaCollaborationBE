CREATE TABLE users (
id TEXT NOT NULL PRIMARY KEY,
email TEXT NOT NULL,
password TEXT NOT NULL,
name TEXT, 
gender TEXT,
phone TEXT,
date_of_birth DATE,
picture TEXT,
role TEXT,
created_on timestamp default CURRENT_TIMESTAMP not null,
updated_on timestamp default CURRENT_TIMESTAMP not null
);



CREATE  FUNCTION update_updated_on_users()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_on = now();
    RETURN NEW;
END;
$$ language 'plpgsql';


CREATE TRIGGER update_users_updated_on
    BEFORE UPDATE
    ON
        users
    FOR EACH ROW
EXECUTE PROCEDURE update_updated_on_users();


CREATE TABLE category (
id TEXT NOT NULL PRIMARY KEY,
name TEXT
);


CREATE TABLE recipes (
id TEXT NOT NULL PRIMARY KEY,
name TEXT NOT NULL,
users_id TEXT,
description TEXT,
photo_id TEXT,
videos_id TEXT,
category_id TEXT,
created_on timestamp default CURRENT_TIMESTAMP not null,
updated_on timestamp default CURRENT_TIMESTAMP not null,
constraint category foreign key(category_id) references category(id),
constraint users foreign key(users_id) references users(id)
);


CREATE  FUNCTION update_updated_on_recipes()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_on = now();
    RETURN NEW;
END;
$$ language 'plpgsql';



CREATE TRIGGER update_recipes_updated_on
    BEFORE UPDATE
    ON
        recipes
    FOR EACH ROW
EXECUTE PROCEDURE update_updated_on_recipes();








CREATE TABLE savedrecipes (
id TEXT NOT NULL PRIMARY KEY,  
recipes_id TEXT,
users_id TEXT,
constraint recipes foreign key(recipes_id) references recipes(id),
constraint users foreign key(users_id) references users(id)
);



CREATE TABLE likesrecipes (
id TEXT NOT NULL PRIMARY KEY,  
recipes_id TEXT,
users_id TEXT,
constraint recipes foreign key(recipes_id) references recipes(id),
constraint users foreign key(users_id) references users(id)
);


CREATE TABLE commentrecipes (
id TEXT NOT NULL PRIMARY KEY,  
recipes_id TEXT,
users_id TEXT,
constraint recipes foreign key(recipes_id) references recipes(id),
constraint users foreign key(users_id) references users(id)
);




-- INSERT INTO recipes(id, name, description, photo_id, videos_id, category_id) values ('1', 'doni jarot', 'blabla', '1', '1', 'category-1'), ('2', 'don ', 'blabla', '1', '1', 'category-1'), ('3', 'jarot', 'blabla', '1', '1', 'category-1'), ('4', 'don don', 'blabla', '1', '1', 'category-1'), ('5', 'jarot jarot', 'blabla', '1', '1', 'category-1');

-- ALTER TABLE recipes ADD column  TEXT;
-- ALTER TABLE recipes ADD constraint users foreign key(users_id) references users(id);

-- INSERT INTO savedrecipes (id, id_recipes, users_id) values ('1', '1', 'e3e0d976-a967-4d46-a765-04da8c9eaa6a');

