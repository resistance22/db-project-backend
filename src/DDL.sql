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

CREATE TABLE IF NOT EXISTS cost_type (
	id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	title varchar(250) NOT NULL UNIQUE,
	creator_user_id INT NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
	CONSTRAINT fk_author
		FOREIGN KEY (creator_user_id)
			REFERENCES panel_user(user_id)
);

CREATE TABLE IF NOT EXISTS cost_amount (
	id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	unit_price money NOT NULL,
	creator_user_id INT NOT NULL,
	cost_type_id INT NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
	CONSTRAINT fk_author
		FOREIGN KEY (creator_user_id)
			REFERENCES panel_user(user_id),
	CONSTRAINT fk_cost_type
		FOREIGN KEY (cost_type_id)
			REFERENCES cost_type(id)
			ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS product_costs (
	creator_user_id INT NOT NULL,
	cost_type_id INT NOT NULL,
	product_id INT NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
	PRIMARY KEY (cost_type_id, product_id),
	CONSTRAINT fk_author
		FOREIGN KEY (creator_user_id)
			REFERENCES panel_user(user_id),
	CONSTRAINT fk_cost_type
		FOREIGN KEY (cost_type_id)
			REFERENCES cost_type(id)
			ON DELETE CASCADE,
	CONSTRAINT fk_product_type
		FOREIGN KEY (product_id)
			REFERENCES product(product_code)
			ON DELETE CASCADE
);



CREATE TABLE IF NOT EXISTS refresh_tokens (
	user_id serial PRIMARY KEY,
	refresh_token varchar(2000)
);

