package net.unipu.CashierSoftwareAPI.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.unipu.CashierSoftwareAPI.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer>{

}