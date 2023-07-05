CREATE TABLE IF NOT EXISTS panel_user (
	user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	role smallint NOT NULL,
	first_name varchar(100) NOT NULL,
	last_name varchar(100) NOT NULL,
	email varchar(255) NOT NULL,
	phone_number char(11) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
	password char(70)
);


CREATE TABLE IF NOT EXISTS product (
	product_code INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	title varchar(250) NOT NULL,
	creator_user_id INT NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
	CONSTRAINT fk_author
		FOREIGN KEY (creator_user_id)
			REFERENCES panel_user(user_id)
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
	user_id serial PRIMARY KEY,
	refresh_token varchar(2000)
);

