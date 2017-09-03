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
