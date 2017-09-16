#REM creating schema
CREATE SCHEMA `product_management_local` ;

#REM creating user table 

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET latin1 NOT NULL,
  `role` enum('ADMIN','SALESMAN') CHARACTER SET latin1 DEFAULT NULL,
  `userid` varchar(45) CHARACTER SET latin1 NOT NULL,
  `password` varchar(100) CHARACTER SET latin1 NOT NULL,
  `active` enum('YES','NO') CHARACTER SET latin1 NOT NULL,
  `createdBy` varchar(45) CHARACTER SET latin1 NOT NULL,
  `createdDate` datetime NOT NULL,
  `updatedBy` varchar(45) CHARACTER SET latin1 NOT NULL,
  `updatedDate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userid_UNIQUE` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

#REM creating product table
  
 CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET latin1 NOT NULL,
  `price` float NOT NULL DEFAULT '0',
  `current_stock` int(10) unsigned NOT NULL DEFAULT '0',
  `threshold_stock` int(10) unsigned NOT NULL DEFAULT '10',
  `createdBy` varchar(45) CHARACTER SET latin1 NOT NULL,
  `createdDate` datetime NOT NULL,
  `updatedBy` varchar(45) CHARACTER SET latin1 NOT NULL,
  `updatedDate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;




#REM creating product_order_history table

CREATE TABLE `product_order_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `quantity` int(10) unsigned NOT NULL DEFAULT '0',
  `price` float NOT NULL DEFAULT '0',
  `createdBy` varchar(45) CHARACTER SET latin1 NOT NULL,
  `createdDate` datetime NOT NULL,
  `updatedBy` varchar(45) CHARACTER SET latin1 NOT NULL,
  `updatedDate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id_fk_idx` (`product_id`),
  CONSTRAINT `product_order_history_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

