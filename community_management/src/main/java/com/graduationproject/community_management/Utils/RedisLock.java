package com.graduationproject.community_management.Utils;

import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;
import org.thymeleaf.util.StringUtils;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisCluster;
import redis.clients.jedis.JedisCommands;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

/**
 * @description: Redis分布式锁操作类
 * @author: Satoshi-Yuen
 * @time: 2021/4/12
 */
@Repository
public class RedisLock {

    private RedisTemplate<Object, Object> redisTemplate;

    private ThreadLocal<String> lockFlag = new ThreadLocal<String>();

    public static final String UNLOCK_LUA;

    static {
        StringBuilder sb = new StringBuilder();
        sb.append("if redis.call(\"get\",KEYS[1]) == ARGV[1]");
        sb.append("then");
        sb.append("return redis.call(\"del\",KEYS[1])");
        sb.append("else");
        sb.append("return 0");
        sb.append("end");
        UNLOCK_LUA = sb.toString();
    }

    public RedisLock(RedisTemplate<Object, Object> redisTemplate) {
        super();
        this.redisTemplate = redisTemplate;
    }

    /**
     * 上锁，无阻塞
     * key：锁id
     * expire：锁过期时间
     */
    public boolean tryLock(String key, long expire) {
        try {
            String result = redisTemplate.execute(new RedisCallback<String>() {
                @Override
                public String doInRedis(RedisConnection redisConnection) throws DataAccessException {
                    JedisCommands commands = (JedisCommands) redisConnection.getNativeConnection();
                    String uuid = UUID.randomUUID().toString();
                    lockFlag.set(uuid);
                    return commands.set(key, uuid, "NX", "PX", expire);
                }
            });
            return !StringUtils.isEmpty(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
//        String token = UUID.randomUUID().toString();
//        Boolean isSuccess = stringRedisTemplate.opsForValue().setIfAbsent(key, token, expire, TimeUnit.MILLISECONDS);
//        if(isSuccess) return token;
//        else return null;
    }

    /**
     * 上锁 存在阻塞
     */
//    public String lock(String name, long expire, long timeout) {
//        long startTime = System.currentTimeMillis();
//        String token;
//        do {
//            token = tryLock(name, expire);
//            if (token == null) {
//                if ((System.currentTimeMillis() - startTime) > (timeout - 50)) {
//                    break;
//                }
//                try {
//                    //try 50 per sec
//                    Thread.sleep(50);
//                } catch (InterruptedException e) {
//                    e.printStackTrace();
//                    return null;
//                }
//            }
//        } while (token == null);
//        return token;
//    }

    /**
     * 解锁操作
     */

//    public boolean unlock(String key,String token){
//        String value = stringRedisTemplate.opsForValue().get("");
//        if (StringUtils.equals(value, token)) {
//            stringRedisTemplate.delete(key);
//            return true;
//        }
//        return false;
//    }
    public boolean releaseLock(String key) {
        try {
            List<String> keys = new ArrayList<String>();
            keys.add(key);
            List<String> args = new ArrayList<String>();
            args.add(lockFlag.get());
            Long result = redisTemplate.execute(new RedisCallback<Long>() {
                public Long doInRedis(RedisConnection connection) throws DataAccessException {
                    Object nativeConnection = connection.getNativeConnection();
                    if (nativeConnection instanceof JedisCluster) {
                        return (Long) ((JedisCluster) nativeConnection).eval(UNLOCK_LUA, keys, args);
                    } else if (nativeConnection instanceof Jedis) {
                        return (Long) ((Jedis) nativeConnection).eval(UNLOCK_LUA, keys, args);
                    }
                    return 0L;
                }
            });
            return result != null && result > 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}
