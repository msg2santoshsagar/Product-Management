#REM creating schema
CREATE DATABASE `product_management_local` /*!40100 DEFAULT CHARACTER SET utf8 */;

#Drop Table Commands
DROP TABLE IF EXISTS `product_order_history`;
DROP TABLE IF EXISTS `sale_product_list`;
DROP TABLE IF EXISTS `sale`;
DROP TABLE IF EXISTS `product`;
DROP TABLE IF EXISTS `user`;


#REM creating user table 

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET latin1 NOT NULL,
  `role` enum('ADMIN','SALESMAN') CHARACTER SET latin1 DEFAULT NULL,
  `userid` varchar(45) CHARACTER SET latin1 NOT NULL,
  `password` varchar(100) CHARACTER SET latin1 NOT NULL,
  `active` enum('YES','NO') CHARACTER SET latin1 NOT NULL,
  `createdBy` int(11) NOT NULL,
  `createdDate` datetime NOT NULL,
  `updatedBy` int(11) NOT NULL,
  `updatedDate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userid_UNIQUE` (`userid`),
  KEY `user_createdBy_FK_idx` (`createdBy`),
  KEY `user_updatedBy_FK_idx` (`updatedBy`),
  CONSTRAINT `user_updatedBy_FK` FOREIGN KEY (`updatedBy`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_createdBy_FK` FOREIGN KEY (`createdBy`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;


#REM creating product table
  
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET latin1 NOT NULL,
  `price` float NOT NULL DEFAULT '0',
  `current_stock` int(10) unsigned NOT NULL DEFAULT '0',
  `threshold_stock` int(10) unsigned NOT NULL DEFAULT '10',
  `createdBy` int(11) NOT NULL,
  `createdDate` datetime NOT NULL,
  `updatedBy` int(11) NOT NULL,
  `updatedDate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_name_UNIQUE` (`name`),
  KEY `product_created_by_fk_idx` (`createdBy`),
  KEY `product_updated_by_fk_idx` (`updatedBy`),
  CONSTRAINT `product_updated_by_fk` FOREIGN KEY (`updatedBy`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `product_created_by_fk` FOREIGN KEY (`createdBy`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;





#REM creating product_order_history table

CREATE TABLE `product_order_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `quantity` int(10) unsigned NOT NULL DEFAULT '0',
  `price` float NOT NULL DEFAULT '0',
  `createdBy` int(11) NOT NULL,
  `createdDate` datetime NOT NULL,
  `updatedBy` int(11) NOT NULL,
  `updatedDate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id_fk_idx` (`product_id`),
  KEY `product_order_history_createdby_fk_idx` (`createdBy`),
  KEY `product_order_history_updatedby_fk_idx` (`updatedBy`),
  CONSTRAINT `product_order_history_createdby_fk` FOREIGN KEY (`createdBy`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `product_order_history_updatedby_fk` FOREIGN KEY (`updatedBy`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `product_order_history_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;


#REM creating sale table

CREATE TABLE `sale` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `total_amount` float NOT NULL,
  `createdBy` int(11) NOT NULL,
  `createdDate` datetime NOT NULL,
  `updatedBy` int(11) NOT NULL,
  `updatedDate` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 ENGINE=InnoDB DEFAULT CHARSET=utf8;

#REM creating sale product list

CREATE TABLE `sale_product_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_no` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `price` float NOT NULL,
  `quantity` int(11) NOT NULL,
  `total` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_no_fk_idx` (`order_no`),
  KEY `product_id_fk_idx` (`product_id`),
  CONSTRAINT `order_no_fk` FOREIGN KEY (`order_no`) REFERENCES `sale` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;