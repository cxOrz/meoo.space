---
slug: swing-grade-manage
title: JavaSwing个人成绩管理系统
authors: mcx
tags: [Java, 大一]
---

> 又是一个寒假，这个寒假比以往的要长一些，半天的任务用了三天...效率确实低。可能还有隐藏的bug待我发现。

## 需求

用Java Swing实现个人成绩的查询，录入、删除、修改,数据库使用MySQL,使用图形化界面，要有登录窗口,要具备一定的容错性。

<!--truncate-->

![登录](https://img-blog.csdnimg.cn/20200206222656675.png)
![界面](https://img-blog.csdnimg.cn/20200206222708163.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQ0MTgyNjc=,size_16,color_FFFFFF,t_70)
![添加](https://img-blog.csdnimg.cn/20200206222844528.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQ0MTgyNjc=,size_16,color_FFFFFF,t_70)
## 代码

代码不多，直接贴吧

```java
import javax.swing.*;
import javax.swing.table.DefaultTableCellRenderer;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.*;
import java.util.Arrays;

public class Student
{
    public static Connection conn = null;//搞成静态变量方便我一次连接一直使用
    public static Statement stmt = null;
    public static ResultSet rs = null;
    public static void main(String[] args) throws InterruptedException {
        SFrame sFrame=new SFrame();
        while (!sFrame.isLogin())Thread.sleep(200);//循环计时来判断是否登录成功，然后隐藏登录窗口，显示进行操作的窗口
        sFrame.setVisible(false);
        try
        {
            // 注册 JDBC 驱动
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 打开链接
            System.out.println("连接数据库...");
            Student.conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/student?serverTimezone=UTC", "root", "root");

            // 执行查询
            System.out.println("实例化Statement对象..");
            Student.stmt = Student.conn.createStatement();
            System.out.println("Done!");

            //完成后关闭。我就不关了，因为我要一直用，总不能用一下开一下再关一下，效率太低。
            //rs.close();
            //stmt.close();
            //conn.close();
        }
        catch (Exception e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(null,"数据库连接失败！");
            System.exit(0);
        }
        Panel panel=new Panel();
    }
}
class SFrame extends JFrame {
    private boolean Login = false;

    public SFrame() //登录窗口
    {
        setSize(300,150);
        setLocation((Toolkit.getDefaultToolkit().getScreenSize().width-300)/2,(Toolkit.getDefaultToolkit().getScreenSize().height-150)/2);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setResizable(false);//不让你调我窗口大小
        JPanel jPanel=new JPanel();//放上一层面板，在面板上放我的控件
        jPanel.setLayout(null);//这里采用绝对布局
        JLabel nm=new JLabel("账号:");
        JLabel pw=new JLabel("密码:");
        nm.setBounds(50,15,50,20);
        pw.setBounds(50,45,50,20);
        JTextField textField=new JTextField();
        JPasswordField jPasswordField=new JPasswordField();
        jPanel.add(textField);
        jPanel.add(jPasswordField);
        textField.setBounds(95,15,130,20);
        jPasswordField.setBounds(95,45,130,20);
        jPasswordField.setBorder(null);
        textField.setBorder(null);
        jPanel.add(nm);
        jPanel.add(pw);
        JButton jButton=new JButton("登录");
        jButton.addActionListener(event->{
            String usr=textField.getText();
            char[] pwd=jPasswordField.getPassword();
            if(usr.equals("admin")&&Arrays.equals(pwd,"admin".toCharArray()))
                setLoginStatus();
            else JOptionPane.showMessageDialog(null,"登录失败！");
        });
        jPanel.add(jButton);
        jButton.setBounds(115,75,60,20);
        add(jPanel);//把面板添加到SFrame上
        setVisible(true);//设置为可见
    }
    public void setLoginStatus()
    {
        this.Login=true;
    }
    public boolean isLogin()
    {
        return this.Login;
    }
}
class Panel extends JFrame//增删改查的窗口
{
    private String[] items = {"序号", "课程", "学时", "学分", "考核方式", "修读性质", "成绩", "辅助标记", "备注"};//用于设置表格的表头
    private String[][] data = new String[8][9];//八行九列表格
    private static int ComboboxSelected;
    private static JTable theTable=null;
    JPanel jPanel = new JPanel();
    JLabel labelAcademy = new JLabel("学 院:");
    JLabel academy = new JLabel("软件学院");
    JLabel labelName = new JLabel("姓 名:");
    JLabel name = new JLabel("某同学");
    JLabel labelClass = new JLabel("班 级:");
    JLabel cls = new JLabel("软件工程19-02");
    JLabel labelId = new JLabel("学 号:");
    JLabel ID = new JLabel("5419134602XX");
    JLabel labelTime = new JLabel("时 间:");
    JLabel label = new JLabel("为之则易,不为则难");
    static JLabel notice=new JLabel("检测到数据有变动，点击检索更新内容");
    JComboBox<String> jComboBox = new JComboBox<>();
    JButton Search = new JButton("检 索");
    JButton add = new JButton("添 加");
    JButton edit = new JButton("编 辑");
    JButton delete = new JButton("删 除");
    JTable table = new JTable(data, items) {
        public boolean isCellEditable(int row, int column) {
            return false;
        }
    };//设置为不可编辑
    JScrollPane jScrollPane = new JScrollPane(table);//只有设置了滚动条才能显示出表头

    public Panel()
    {
        setTitle("                                                                                        个人成绩管理系统");
        setSize(750, 400);
        setLocation((Toolkit.getDefaultToolkit().getScreenSize().width - 750) / 2, (Toolkit.getDefaultToolkit().getScreenSize().height - 400) / 2);//窗口居中
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setResizable(false);//拒绝你调整窗口大小来搞我的布局
        jPanel.setLayout(null);
        jComboBox.addItem("--------请选择--------");
        jComboBox.addItem("2019-2020第一学期");
        jComboBox.addItem("2019-2020第二学期");
        label.setFont(new Font("华文行楷", Font.ITALIC, 22));
        jPanel.add(label);
        jPanel.add(labelAcademy);
        jPanel.add(academy);
        jPanel.add(labelName);
        jPanel.add(name);
        jPanel.add(labelClass);
        jPanel.add(cls);
        jPanel.add(labelId);
        jPanel.add(ID);
        jPanel.add(labelTime);
        jPanel.add(jComboBox);
        jPanel.add(Search);
        jPanel.add(jScrollPane);
        jPanel.add(add);
        jPanel.add(edit);
        jPanel.add(delete);
        jPanel.add(notice);
        label.setBounds(265, 10, 210, 24);

        labelAcademy.setBounds(70, 50, 40, 20);
        labelAcademy.setFont(new Font("微软雅黑", Font.BOLD, 14));
        academy.setBounds(110, 50, 100, 20);
        academy.setFont(new Font("微软雅黑", Font.BOLD, 14));

        labelClass.setBounds(200, 50, 40, 20);
        labelClass.setFont(new Font("微软雅黑", Font.BOLD, 14));
        cls.setBounds(240, 50, 110, 20);
        cls.setFont(new Font("微软雅黑", Font.BOLD, 14));

        labelId.setBounds(380, 50, 40, 20);
        labelId.setFont(new Font("微软雅黑", Font.BOLD, 14));
        ID.setBounds(420, 50, 110, 20);
        ID.setFont(new Font("微软雅黑", Font.BOLD, 14));

        labelName.setBounds(570, 50, 40, 20);
        labelName.setFont(new Font("微软雅黑", Font.BOLD, 14));
        name.setBounds(610, 50, 110, 20);
        name.setFont(new Font("微软雅黑", Font.BOLD, 14));

        labelTime.setBounds(70, 90, 40, 20);
        labelTime.setFont(new Font("微软雅黑", Font.BOLD, 14));

        notice.setBounds(360,92,210,20);//这个notice是用来提示用户该不该进行检索
        notice.setForeground(Color.red);//字体颜色
        notice.setVisible(false);//初始就是不可见也就是不提示了
        jComboBox.setBounds(110, 92, 130, 18);
        Search.setBounds(583, 92, 70, 20);
        table.getColumnModel().getColumn(0).setPreferredWidth(40);
        table.getColumnModel().getColumn(1).setPreferredWidth(120);
        table.getColumnModel().getColumn(2).setPreferredWidth(40);
        table.getColumnModel().getColumn(3).setPreferredWidth(40);
        table.getColumnModel().getColumn(4).setPreferredWidth(60);
        table.getColumnModel().getColumn(5).setPreferredWidth(60);
        table.getColumnModel().getColumn(6).setPreferredWidth(40);
        table.getColumnModel().getColumn(7).setPreferredWidth(60);
        table.getColumnModel().getColumn(8).setPreferredWidth(130);
        DefaultTableCellRenderer cr = new DefaultTableCellRenderer();//表格内容居中
        cr.setHorizontalAlignment(JLabel.CENTER);
        table.setDefaultRenderer(Object.class, cr);
        jScrollPane.setBounds(70, 120, 583, 150);
        jScrollPane.setBorder(BorderFactory.createLineBorder(Color.gray));

        add.setBounds(127, 290, 70, 20);
        edit.setBounds(327, 290, 70, 20);
        delete.setBounds(527, 290, 70, 20);
        add(jPanel);
        setVisible(true);

        Search.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try
                {
                    getComboboxSelected();//设置一下时间（读取下拉列表的值，存到静态变量里）
                    if(getTerm()==1)//再读取一下静态变量里的时间
                        Student.rs=Student.stmt.executeQuery("SELECT * FROM mscore");//我有两个表，一个mscore，另一个mscorecp，分别储存不同学期的成绩
                    else
                    {
                        if(getTerm()==2) Student.rs=Student.stmt.executeQuery("SELECT * FROM mscorecp");
                        else
                        {
                            JOptionPane.showMessageDialog(null,"            请选择时间！");
                            return;
                        }
                    }
                    for(int i=0;i<8;i++)
                    {
                        for(int j=0;j<9;j++)
                        {
                            table.setValueAt("",i,j);
                        }
                    }
                    for(int i=0;Student.rs.next();i++)
                    {
                        String cls1 = Student.rs.getString("cls");
                        int period=Student.rs.getInt("period");
                        double credit=Student.rs.getDouble("credit");
                        String freq=Student.rs.getString("freq");
                        String examType=Student.rs.getString("examtype");
                        double score=Student.rs.getDouble("score");
                        String majorType=Student.rs.getString("majortype");
                        String notes = Student.rs.getString("notes");

                        setLine(i,i+1,cls1,period,credit,freq, examType, score, majorType, notes);
                    }
                    table.repaint();//重绘才能产生变化
                    Panel.notice.setVisible(false);
                } catch (SQLException ex)
                {
                    ex.printStackTrace();
                }
            }
        });
        add.addActionListener(new ActionListener() //监听器：添加
        {
            @Override
            public void actionPerformed(ActionEvent e) {
                getComboboxSelected();
                if(getTerm()==0)
                {
                    Toolkit.getDefaultToolkit().beep();
                    JOptionPane.showMessageDialog(null,"            未选择时间!");
                    return;
                }
                addDialog dialog=new addDialog();
            }
        });
        edit.addActionListener(new ActionListener() //监听器：编辑
        {
            @Override
            public void actionPerformed(ActionEvent e)
            {
                getComboboxSelected();
                if(getTerm()==0)
                {
                    Toolkit.getDefaultToolkit().beep();
                    JOptionPane.showMessageDialog(null,"            未选择时间!");
                    return;
                }
                int row;
                if((row=table.getSelectedRow())==-1)
                {
                    Toolkit.getDefaultToolkit().beep();
                    JOptionPane.showMessageDialog(null,"       并未选中任何内容!");
                }
                else
                {
                    int i;
                    try {
                        Student.rs=Student.stmt.executeQuery("SELECT * FROM "+(getTerm()==1?"mscore":"mscorecp"));
                        for (i=0;Student.rs.next();i++);
                        if(i<row+1)
                        {
                            Toolkit.getDefaultToolkit().beep();
                            JOptionPane.showMessageDialog(null,"           请选择有效行!");
                            return;
                        }
                        setTable();
                        editDialog editDlg=new editDialog();
                    } catch (SQLException ex) {
                        ex.printStackTrace();
                    }
            }

            }
        });
        delete.addActionListener(new ActionListener() //监听器：删除
        {
            @Override
            public void actionPerformed(ActionEvent e) {
                getComboboxSelected();
                if(getTerm()==0)
                {
                    Toolkit.getDefaultToolkit().beep();
                    JOptionPane.showMessageDialog(null,"            未选择时间!");
                    return;
                }
                int row;
                if((row=table.getSelectedRow())==-1)
                {
                    Toolkit.getDefaultToolkit().beep();
                    JOptionPane.showMessageDialog(null,"       并未选中任何内容!");
                    return;
                }
                if(table.getValueAt(row,0)==null||table.getValueAt(row,0).equals(""))
                {
                    JOptionPane.showMessageDialog(null,"           请选择有效行!");
                    return;
                }
                try {
                    Student.stmt.executeUpdate("DELETE FROM "+(getTerm()==1?"mscore":"mscorecp")+" WHERE cls='"+table.getValueAt(row,1)+"'");
                    Toolkit.getDefaultToolkit().beep();
                    JOptionPane.showMessageDialog(null,"删除完成!");
                    Panel.notice.setVisible(true);
                } catch (SQLException ex) {
                    ex.printStackTrace();
                }
            }
        });
    }
    public static Object[][] getLine()//获取一行各个数据的值，返回它们组成的一个OBJECT二维数组，用于在添加窗口中显示选中行的数据
    {
        JTable theTable=Panel.theTable;//传递来的table对象引用
        int row=theTable.getSelectedRow();
        return new Object[][]{{theTable.getValueAt(row,1),theTable.getValueAt(row,2),theTable.getValueAt(row,3),theTable.getValueAt(row,4),
                theTable.getValueAt(row,5),theTable.getValueAt(row,6),theTable.getValueAt(row,7),theTable.getValueAt(row,8)}};
    }
    public void setTable()
    {
        theTable=this.table;
    }
    /**
     * @param row 行号从0开始
     * @param id 序号
     * @param cls 学科
     * @param period 时间
     * @param credit 学分
     * @param freq 初修？
     * @param examType 考查方式
     * @param score 成绩
     * @param majorType 选修？
     * @param notes 备注
     */
    public void setLine(int row,int id,String cls,int period,double credit,String freq,String examType,double score,String majorType,String notes)
    {
        table.setValueAt(Integer.toString(id),row,0);
        table.setValueAt(cls,row,1);
        table.setValueAt(Integer.toString(period),row,2);
        table.setValueAt(Double.toString(credit),row,3);
        table.setValueAt(examType,row,4);
        table.setValueAt(freq,row,5);
        table.setValueAt(Double.toString(score),row,6);
        table.setValueAt(majorType,row,7);
        table.setValueAt(notes,row,8);
    }
    public static int getTerm()
    {
        return ComboboxSelected;
    }
    public void getComboboxSelected()
    {
        ComboboxSelected=jComboBox.getSelectedIndex();
    }
}
class addDialog extends JDialog //窗口类：添加
{
    String[] items = {"课程", "学时", "学分", "考核方式", "修读性质", "成绩", "辅助标记", "备注"};
    Object[][] data = new Object[1][8];
    JPanel jPanel=new JPanel();
    JTable table=new JTable(data, items);
    JButton jButton=new JButton("添 加");
    JScrollPane jScrollPane=new JScrollPane(table);
    public addDialog()
    {
        setTitle("添加--2019-2020学年第"+Panel.getTerm()+"学期");
        setSize(700, 150);
        setLocation((Toolkit.getDefaultToolkit().getScreenSize().width - 700) / 2, (Toolkit.getDefaultToolkit().getScreenSize().height - 150) / 2);
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        setResizable(false);//拒绝你调整窗口大小来搞我的布局
        setModal(true);
        jButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                if(table.isEditing())table.getCellEditor().stopCellEditing();//是否正在编辑单元格,要停止编辑，其值才能更新
                if (table.getValueAt(0, 0) == null || table.getValueAt(0, 0).equals("")) {
                    JOptionPane.showMessageDialog(null, "             出现空字段！");
                    return;
                }
                if (table.getValueAt(0, 1) == null || table.getValueAt(0, 1).equals("") || !Tools.isNumber((String) table.getValueAt(0, 1))) {
                    JOptionPane.showMessageDialog(null, "请检查学时是否为空或无效值！");
                    return;
                }
                if (table.getValueAt(0, 2) == null || table.getValueAt(0, 2).equals("") || !Tools.isNumber((String) table.getValueAt(0, 2))) {
                    JOptionPane.showMessageDialog(null, "请检查学分是否为空或无效值！");
                    return;
                }
                if (table.getValueAt(0,3)==null||!(table.getValueAt(0, 3).equals("考试")|| table.getValueAt(0, 3).equals("考查"))) {
                    JOptionPane.showMessageDialog(null, "考核方式不合法!考试或考查？");
                    return;
                }
                if (table.getValueAt(0, 4)==null||!(table.getValueAt(0, 4).equals("重修") || table.getValueAt(0, 4).equals("初修"))) {
                    JOptionPane.showMessageDialog(null, "修读性质不合法!重修或初修？");
                    return;
                }
                if (table.getValueAt(0, 5) == null || table.getValueAt(0, 5).equals("") || !Tools.isNumber((String) table.getValueAt(0, 5))) {
                    JOptionPane.showMessageDialog(null, "请检查成绩是否为空或无效值！");
                    return;
                }
                if (table.getValueAt(0, 6)==null||!(table.getValueAt(0, 6).equals("主修") || table.getValueAt(0, 6).equals("辅修"))) {
                    JOptionPane.showMessageDialog(null, "辅助标记不合法!主修或辅修？");
                    return;
                }
                if(table.getValueAt(0,7)==null)
                {
                    table.setValueAt("",0,7);
                }
                String cls = table.getValueAt(0,0).toString();
                String period=table.getValueAt(0,1).toString();
                String credit=table.getValueAt(0,2).toString();
                String examtype=table.getValueAt(0,3).toString();
                String freq=table.getValueAt(0,4).toString();
                String score=table.getValueAt(0,5).toString();
                String majortype=table.getValueAt(0,6).toString();
                String notes=table.getValueAt(0,7).toString();
                int i;
                try
                {
                    Student.rs = Student.stmt.executeQuery("SELECT * FROM "+(Panel.getTerm()==1?"mscore":"mscorecp"));
                    for (i=0;Student.rs.next();i++)
                    {
                        if(table.getValueAt(0,0).equals(Student.rs.getString("cls")))
                        {
                            Toolkit.getDefaultToolkit().beep();
                            JOptionPane.showMessageDialog(null,"请勿重复添加!");
                            return;
                        }
                    }
                    int hash=(cls+period+credit+examtype+freq+score+majortype+notes).hashCode();
                    String sql1="insert into "+(Panel.getTerm()==1?"mscore":"mscorecp")+" values("+hash+",'"+cls+"',"+period+","+credit+",'"+examtype+"','"+freq+"',"+score+",'"+majortype+"','"+notes+"')";
                    Student.stmt.executeUpdate(sql1);
                    Toolkit.getDefaultToolkit().beep();
                    JOptionPane.showMessageDialog(null,"添加完成!");
                    Panel.notice.setVisible(true);
                    table.setValueAt(null,0,0);
                    table.setValueAt(null,0,1);
                    table.setValueAt(null,0,2);
                    table.setValueAt(null,0,3);
                    table.setValueAt(null,0,4);
                    table.setValueAt(null,0,5);
                    table.setValueAt(null,0,6);
                    table.setValueAt("",0,7);
                    table.repaint();
                } catch (SQLException ex)
                {
                    ex.printStackTrace();
                }
            }
        });
        jPanel.add(jScrollPane);
        jPanel.add(jButton);
        jButton.setBounds(307,70,70,20);
        jScrollPane.setBounds(18,10,650,39);
        jPanel.setLayout(null);
        add(jPanel);
        setVisible(true);
    }

}
class editDialog extends JDialog //窗口类：编辑
{
    String[] items = {"课程", "学时", "学分", "考核方式", "修读性质", "成绩", "辅助标记", "备注"};
    JPanel jPanel = new JPanel();
    JTable table = new JTable(Panel.getLine(), items);
    JButton jButton = new JButton("修 改");
    JScrollPane jScrollPane = new JScrollPane(table);

    public editDialog() {
        setTitle("修改--2019-2020学年第" + Panel.getTerm() + "学期");
        setSize(700, 150);
        setLocation((Toolkit.getDefaultToolkit().getScreenSize().width - 700) / 2, (Toolkit.getDefaultToolkit().getScreenSize().height - 150) / 2);
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        setResizable(false);//拒绝你调整窗口大小来搞我的布局
        setModal(true);
        jButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                if (table.isEditing()) table.getCellEditor().stopCellEditing();//是否正在编辑单元格,要停止编辑，其值才能更新
                if (table.getValueAt(0, 0) == null || table.getValueAt(0, 0).equals("")) {
                    JOptionPane.showMessageDialog(null, "出现空字段！");
                    return;
                }
                if (table.getValueAt(0, 1) == null || table.getValueAt(0, 1).equals("") || !Tools.isNumber((String) table.getValueAt(0, 1))) {
                    JOptionPane.showMessageDialog(null, "请检查学时是否为空或无效值！");
                    return;
                }
                if (table.getValueAt(0, 2) == null || table.getValueAt(0, 2).equals("") || !Tools.isNumber((String) table.getValueAt(0, 2))) {
                    JOptionPane.showMessageDialog(null, "请检查学分是否为空或无效值！");
                    return;
                }
                if (table.getValueAt(0,3)==null||!(table.getValueAt(0, 3).equals("考试")|| table.getValueAt(0, 3).equals("考查"))) {
                    JOptionPane.showMessageDialog(null, "考核方式不合法!考试或考查？");
                    return;
                }
                if (table.getValueAt(0, 4)==null||!(table.getValueAt(0, 4).equals("重修") || table.getValueAt(0, 4).equals("初修"))) {
                    JOptionPane.showMessageDialog(null, "修读性质不合法!重修或初修？");
                    return;
                }
                if (table.getValueAt(0, 5) == null || table.getValueAt(0, 5).equals("") || !Tools.isNumber((String) table.getValueAt(0, 5))) {
                    JOptionPane.showMessageDialog(null, "请检查成绩是否为空或无效值！");
                    return;
                }
                if (table.getValueAt(0, 6)==null||!(table.getValueAt(0, 6).equals("主修") || table.getValueAt(0, 6).equals("辅修"))) {
                    JOptionPane.showMessageDialog(null, "辅助标记不合法!主修或辅修？");
                    return;
                }
                if (table.getValueAt(0, 7) == null) {
                    table.setValueAt("",0,7);
                }
                String cls = table.getValueAt(0, 0).toString();
                String period = table.getValueAt(0, 1).toString();
                String credit = table.getValueAt(0, 2).toString();
                String examtype = table.getValueAt(0, 3).toString();
                String freq = table.getValueAt(0, 4).toString();
                String score = table.getValueAt(0, 5).toString();
                String majortype = table.getValueAt(0, 6).toString();
                String notes = table.getValueAt(0, 7).toString();
                try {
                    Student.rs = Student.stmt.executeQuery("SELECT * FROM " + (Panel.getTerm() == 1 ? "mscore" : "mscorecp"));
                    String sql = "UPDATE " + (Panel.getTerm() == 1 ? "mscore" : "mscorecp") + " SET cls='"+ cls + "',period=" + period + ",credit=" + credit + ",examtype='" + examtype + "',freq='" + freq + "',score=" + score + ",majortype='" + majortype + "',notes='" + notes + "' WHERE cls='"+cls+"'";
                    Student.stmt.executeUpdate(sql);
                    Toolkit.getDefaultToolkit().beep();
                    JOptionPane.showMessageDialog(null, "修改完成!");
                    Panel.notice.setVisible(true);
                    table.setValueAt(null, 0, 0);
                    table.setValueAt(null, 0, 1);
                    table.setValueAt(null, 0, 2);
                    table.setValueAt(null, 0, 3);
                    table.setValueAt(null, 0, 4);
                    table.setValueAt(null, 0, 5);
                    table.setValueAt(null, 0, 6);
                    table.setValueAt("", 0, 7);
                    table.repaint();
                } catch (SQLException ex) {
                    ex.printStackTrace();
                }
            }
        });
        jPanel.add(jScrollPane);
        jPanel.add(jButton);
        jButton.setBounds(307, 70, 70, 20);
        jScrollPane.setBounds(18, 10, 650, 39);
        jPanel.setLayout(null);
        add(jPanel);
        setVisible(true);
    }
}
class Tools //工具类
{
    public static boolean isNumber(String str)//正则，判断是否小数或者整数
    {

        String reg = "^[0-9]+(.[0-9]+)?$";

        return str.matches(reg);
    }
}
```
