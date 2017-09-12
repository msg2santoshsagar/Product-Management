#REM creating schema
CREATE SCHEMA `product_management_local` ;

#REM creating user table 

CREATE TABLE `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `role` ENUM('ADMIN', 'SALESMAN') NULL,
  `userid` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `active` ENUM('YES','NO') NOT NULL,  
  `createdBy` VARCHAR(45) NOT NULL,
  `createdDate` DATE NOT NULL,
  `updatedBy` VARCHAR(45) NOT NULL,
  `updatedDate` DATE NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `userid_UNIQUE` (`userid` ASC));

#REM creating product table
  
 CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `price` float NOT NULL DEFAULT '0',
  `current_stock` int(10) unsigned NOT NULL DEFAULT '0',
  `threshold_stock` int(10) unsigned NOT NULL DEFAULT '10',
  `createdBy` varchar(45) NOT NULL,
  `createdDate` date NOT NULL,
  `updatedBy` varchar(45) NOT NULL,
  `updatedDate` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;



#REM creating product_order_history table

  CREATE TABLE `product_order_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `quantity` int(10) unsigned NOT NULL DEFAULT '0',
  `price` float NOT NULL DEFAULT '0',
  `createdBy` varchar(45) NOT NULL,
  `createdDate` date NOT NULL,
  `updatedBy` varchar(45) NOT NULL,
  `updatedDate` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id_fk_idx` (`product_id`),
  CONSTRAINT `product_order_history_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
