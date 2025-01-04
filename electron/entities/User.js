const { Entity, PrimaryGeneratedColumn, Column } = require('typeorm');

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id;

  @Column({ type: 'varchar', length: 100 })
  name;

  @Column({ type: 'varchar', unique: true })
  email;

  @Column({ type: 'varchar' })
  password;
}

module.exports = User;
