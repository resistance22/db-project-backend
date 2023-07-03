CREATE TABLE IF NOT EXISTS panel_user (
	user_id serial PRIMARY KEY,
	role smallint NOT NULL,
	first_name varchar(100) NOT NULL,
	last_name varchar(100) NOT NULL,
	email varchar(255) NOT NULL,
	phone_number char(11) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS refresh_tokens (
	user_id serial PRIMARY KEY,
	refresh_token varchar(2000)
);

