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
  `current_stock` int(10) unsigned NOT NULL DEFAULT '0',
  `threshold_stock` int(10) unsigned NOT NULL DEFAULT '10',
  `createdBy` varchar(45) NOT NULL,
  `createdDate` date NOT NULL,
  `updatedBy` varchar(45) NOT NULL,
  `updatedDate` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

