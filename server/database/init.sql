CREATE TABLE IF NOT EXISTS `category` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_category PRIMARY KEY (id)
);
----------
CREATE TABLE IF NOT EXISTS `location` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_location PRIMARY KEY (id)
);
----------
CREATE TABLE IF NOT EXISTS `user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `location1_id` INT NOT NULL,
    `location2_id` INT NULL,
    `nickname` VARCHAR(45) NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_user PRIMARY KEY (id),
    CONSTRAINT FK_u_locId1 FOREIGN KEY (location1_id) REFERENCES location (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_u_locId2 FOREIGN KEY (location2_id) REFERENCES location (id) ON DELETE RESTRICT ON UPDATE CASCADE
);
----------
CREATE TABLE IF NOT EXISTS `post` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(45) NOT NULL,
    `location_id` INT NOT NULL,
    `category_id` INT NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `content` TEXT NOT NULL,
    `view_count` INT NOT NULL DEFAULT '0',
    `price` INT NOT NULL,
    `seller_id` INT NOT NULL,
    `state` VARCHAR(45) NOT NULL,
    `thumbnail` VARCHAR(255) NOT NULL,
    `interest_count` INT NOT NULL DEFAULT '0',
    `chatroom_count` INT NOT NULL DEFAULT '0',
    CONSTRAINT PK_post PRIMARY KEY (id),
    CONSTRAINT FK_p_locId1 FOREIGN KEY (location_id) REFERENCES location (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_p_catgoryId FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_p_sellerId FOREIGN KEY (seller_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
);
----------
CREATE TABLE IF NOT EXISTS `interest` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `post_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_interest PRIMARY KEY (id),
    CONSTRAINT FK_l_postId FOREIGN KEY (post_id) REFERENCES post (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_l_userId FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE
);
----------
CREATE TABLE IF NOT EXISTS `image` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(255) NOT NULL,
    `post_id` INT NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_image PRIMARY KEY (id),
    CONSTRAINT FK_i_postId FOREIGN KEY (post_id) REFERENCES post (id) ON DELETE CASCADE ON UPDATE CASCADE
);
----------
CREATE TABLE IF NOT EXISTS `chatRoom` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `post_id` INT NOT NULL,
    `seller_id` INT NOT NULL,
    `buyer_id` INT NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `last_text` TEXT NULL,
    CONSTRAINT PK_chatRoom PRIMARY KEY (id),
    CONSTRAINT FK_c_postId FOREIGN KEY (post_id) REFERENCES post (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_c_sellerId FOREIGN KEY (seller_id) REFERENCES user (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_c_buyerId FOREIGN KEY (buyer_id) REFERENCES user (id) ON DELETE RESTRICT ON UPDATE CASCADE
);
----------
CREATE TABLE IF NOT EXISTS `chat` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `room_id` INT NOT NULL,
    `text` TEXT NOT NULL,
    `user_id` INT NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT PK_chat PRIMARY KEY (id),
    CONSTRAINT FK_c_userId FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_c_roomId FOREIGN KEY (room_id) REFERENCES chatRoom (id) ON DELETE CASCADE ON UPDATE CASCADE
);
----------
CREATE TABLE IF NOT EXISTS `chatJoined` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `room_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `unread_count` INT NOT NULL DEFAULT '0',
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT PK_chatJoined PRIMARY KEY (id),
    CONSTRAINT FK_c_user_id FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE RESTRICT,
    CONSTRAINT FK_c_chatRoom_id FOREIGN KEY (room_id) REFERENCES chatRoom (id) ON DELETE CASCADE ON UPDATE CASCADE
);