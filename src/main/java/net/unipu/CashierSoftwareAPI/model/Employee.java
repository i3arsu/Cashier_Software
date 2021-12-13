package net.unipu.CashierSoftwareAPI.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "employees")
@Getter
@Setter
@ToString
public class Employee {

    private enum Position {
        CASHIER,
        MENAGER,
        BOSS;

        public static Position fromInt(int i) {
            return Position.values()[i];
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "position")
    private int position;

    public Employee() {}

    public Employee(int id, String name, int position) {
        super();
        this.id = id;
        this.name = name;
        this.position = position;
    }
}
