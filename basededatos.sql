SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `intermodular` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
USE `intermodular`;

CREATE TABLE IF NOT EXISTS usuarios (
    id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    name varchar(100)  NOT NULL,
    password varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    tipe int(1) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (name),
    UNIQUE (email)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS posts (
     id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
     titulo varchar(100)  NOT NULL,
     mensaje varchar(100) NOT NULL,
     publicada int(1) NOT NULL,
     usuario_id int(10) UNSIGNED NOT NULL,
     PRIMARY KEY (id),
     CONSTRAINT `fk_posts_usuarios` 
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id) 
        ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS comentarios (
     id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
     contenido varchar(200)  NOT NULL,
     post_id int(10) UNSIGNED NOT NULL,
     usuario_id int(10) UNSIGNED NOT NULL,
     PRIMARY KEY (id),
     CONSTRAINT `fk_comentarios_usuarios` 
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id) 
        ON UPDATE CASCADE,
    CONSTRAINT `fk_comentarios_posts` 
        FOREIGN KEY (post_id) REFERENCES posts (id) 
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS valoraciones (
     id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
     contenido int(1)  NOT NULL,
     post_id int(10) UNSIGNED NOT NULL,
     usuario_id int(10) UNSIGNED NOT NULL,
     PRIMARY KEY (id),
     CONSTRAINT `fk_valoraciones_usuarios` 
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id) 
        ON UPDATE CASCADE,
    CONSTRAINT `fk_valoraciones_posts` 
        FOREIGN KEY (post_id) REFERENCES posts (id) 
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS imagenes (
    id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    url longblob NOT NULL,
    usuario_id int(10) UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (url),
    CONSTRAINT `fk_imagenes_usuarios` 
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id) 
        ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS formulario (
    id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    name varchar(100)  NOT NULL,
    mensaje varchar(200) NOT NULL,
    email varchar(100) NOT NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB;